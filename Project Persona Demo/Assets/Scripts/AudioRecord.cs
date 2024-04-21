using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class AudioRecord : MonoBehaviour
{
    private AudioClip recordedClip;

    public void StartRecording()
    {
        recordedClip = Microphone.Start(null, false, 5, 44100); // Start recording for 5 seconds
    }

    public void StopRecording()
    {
        Microphone.End(null); // Stop recording
       
    }

    public AudioClip GetRecordedClip()
    {
        return recordedClip;
    }

}
