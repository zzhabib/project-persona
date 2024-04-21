using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Persona.Query;
using System.Threading.Tasks;
using System.Collections.Specialized;
using UnityEngine.Events;
using TMPro;
using UnityEngine.InputSystem;



using static System.Net.Mime.MediaTypeNames;
using UnityEngine.Windows;
using UnityEditor.ShaderGraph.Serialization;

public class playerInteract : MonoBehaviour
{

    public PlayerInput playerInput;
    private bool isInteracting = false;
    private UnityAction<string> onSubmitListener;

    public AudioRecord audioRecorder;
    public AudioManager audioManager;
    private bool IsRecording = false;
    public SpeechToText speechToText;

    [SerializeField] public TTSManager ttsManager;
   



    private void Update()
    {
        if (UnityEngine.Input.GetKeyDown(KeyCode.E))
        {
            IsRecording= true;
            audioRecorder.StartRecording();


        }
        if (UnityEngine.Input.GetKeyUp(KeyCode.E))
        {
            if (IsRecording)
            {
                IsRecording= false;

                audioRecorder.StopRecording();

                StartInteraction();            

            }

        }


    }

    public class MyJsonObject
    {
        [SerializeField]
        private string _text; // Field name different from the property name

        public string text
        {
            get { return _text; }
            set { _text = value; }
        }
    }

    private async Task<string> GetText(AudioClip clip)
    {
        string val = await speechToText.SendToWhisperAPI(clip);
        Debug.Log(val);


        MyJsonObject jsonObject = JsonUtility.FromJson<MyJsonObject>(val);

        // Access the property inside the JSON object
        string myProperty = jsonObject.text;
        return val;

    }





    private void StartInteraction()
    {
        playerInput.enabled = false; // Disable Character Controller
       

        float interactRange = 2f;
        Collider[] colliderArray = Physics.OverlapSphere(transform.position, interactRange);
        foreach (Collider collider in colliderArray)
        {
            if (collider.isTrigger)
            {
                UnityEngine.Debug.Log("Interacting with: " + collider.name);
                BeginInputInteraction(collider.name);  //
                break;
            }
        }
    }





    private async void BeginInputInteraction(string idStr)
    {
    


        string data = await GetText(audioRecorder.GetRecordedClip());
        EndInputInteraction(data, idStr);



        isInteracting = true;
    }

    private async void EndInputInteraction(string inputText, string idStr)
    {

        if (inputText != "")
        {
            int storySessionId = 3; // Nathan's story
            int sceneId = 3;
            int senderPersonaId = 6;


            int recipientPersonaId = int.Parse(idStr);//

            var resp = await Persona.Query.UserQueries.CreateUserMessage(storySessionId, sceneId, senderPersonaId, recipientPersonaId, inputText);
            UnityEngine.Debug.Log("Message sent: " + resp.Text);

            if (ttsManager != null)
            {
                ttsManager.SynthesizeAndPlay(resp.Text, TTSModel.TTS_1, TTSVoice.Fable, 1f);
            }
            else
            {
                Debug.Log("failed to find ttsManager");
            }
        }


        playerInput.enabled = true; // Enable Character Controller
        isInteracting = false;
    }

}