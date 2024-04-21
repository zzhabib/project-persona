using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using UnityEngine;
using System.Text;
using UnityEngine.Networking;
using System.IO;

using UnityEngine.UI;
using System.Collections;

using TMPro;


public class SpeechToText : MonoBehaviour
{
    private readonly string openAIKey = "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";


    public byte[] ConvertAudioClipToWavByteArray(AudioClip audioClip)
    {
        // Create a new empty WAV file
        MemoryStream memoryStream = new MemoryStream();
        BinaryWriter binaryWriter = new BinaryWriter(memoryStream);

        // Write WAV header
        binaryWriter.Write(new char[4] { 'R', 'I', 'F', 'F' });
        binaryWriter.Write(36 + audioClip.samples * 2); // File size
        binaryWriter.Write(new char[4] { 'W', 'A', 'V', 'E' });

        // Write format chunk
        binaryWriter.Write(new char[4] { 'f', 'm', 't', ' ' });
        binaryWriter.Write(16); // Sub-chunk size
        binaryWriter.Write((ushort)1); // Audio format (1 for PCM)
        binaryWriter.Write((ushort)audioClip.channels); // Number of channels
        binaryWriter.Write(audioClip.frequency); // Sample rate
        binaryWriter.Write(audioClip.frequency * audioClip.channels * 2); // Byte rate
        binaryWriter.Write((ushort)(audioClip.channels * 2)); // Block align
        binaryWriter.Write((ushort)16); // Bits per sample

        // Write data chunk
        binaryWriter.Write(new char[4] { 'd', 'a', 't', 'a' });
        binaryWriter.Write(audioClip.samples * 2); // Data size
        ConvertAndWrite(binaryWriter, audioClip); // Convert and write audio clip data

        // Close the writer and return the WAV byte array
        binaryWriter.Close();
        return memoryStream.ToArray();
    }

    // Method to convert and write audio clip data to the binary writer
    private void ConvertAndWrite(BinaryWriter writer, AudioClip clip)
    {
        float[] samples = new float[clip.samples];
        clip.GetData(samples, 0);

        int maxValue = 0;
        foreach (float sample in samples)
        {
            int intSample = (int)(sample * 32767f);
            if (intSample > maxValue)
            {
                maxValue = intSample;
            }
            writer.Write(intSample);
        }
    }


    public async Task<string> SendToWhisperAPI(AudioClip clip)
    {
        byte[] audioData = ConvertAudioClipToWavByteArray(clip);
        WWWForm form = new WWWForm();
        form.AddBinaryData("file", audioData, "audio.wav", "audio/wav");
        form.AddField("model", "whisper-1");

        UnityWebRequest www = UnityWebRequest.Post("https://api.openai.com/v1/audio/transcriptions", form);
        www.SetRequestHeader("Authorization", "Bearer " + openAIKey);

        var operation = www.SendWebRequest();
        while (!operation.isDone)
        {
            await Task.Delay(100); // Poll every 100 milliseconds
        }

        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError(www.error);
            Debug.LogError(www.downloadHandler.text);
            return null;
        }
        else
        {
            string jsonResponse = www.downloadHandler.text;
            string data = JsonUtility.FromJson<string>(jsonResponse);
            Debug.Log("Set text in input field: " + data);
            return jsonResponse;
        }


    }
}