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

public class playerInteract : MonoBehaviour
{
    public InputField inputField; // Reference to the InputField
    
    public GameObject dialogueBox;
    public TMP_Text dialogueText;

 
    public PlayerInput playerInput;

   


    private bool isInteracting = false;
    private UnityAction<string> onSubmitListener;


    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.E) && !isInteracting)
        {
            StartInteraction();
        }
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

    private void BeginInputInteraction(string idStr)
    {
        //PlayerMovement.canMove = false; // Disable player movement
        inputField.gameObject.SetActive(true);
        inputField.ActivateInputField();
        inputField.Select();

        onSubmitListener = (data) => EndInputInteraction(data, idStr);
        inputField.onSubmit.AddListener(onSubmitListener); // Listen for submit event
        isInteracting = true;
    }

    private async void EndInputInteraction(string inputText, string idStr)
    {


        inputField.onSubmit.RemoveListener(onSubmitListener); // Remove listener
        inputField.text = "";
        inputField.gameObject.SetActive(false);


        if (inputText != "")
        {
            int storySessionId = 1;
            int sceneId = 1;
            int senderPersonaId = 1;

           
            int recipientPersonaId = int.Parse(idStr);//

            var resp = await Persona.Query.UserQueries.CreateUserMessage(storySessionId, sceneId, senderPersonaId, recipientPersonaId, inputText);
            UnityEngine.Debug.Log("Message sent: " + resp.Text);
            GetDialogue(resp.Text);

        }


        playerInput.enabled = true; // Enable Character Controller
        isInteracting = false;
    }


    public void GetDialogue(string dialogue)
    {
        dialogueText.text = dialogue;
        dialogueBox.SetActive(true);

        StartCoroutine(WaitAndHideDialogue(5)); // Start coroutine to wait for 5 seconds
    }

    private IEnumerator WaitAndHideDialogue(float waitTime)
    {
        yield return new WaitForSeconds(waitTime); // Wait for waitTime seconds

        dialogueText.text = ""; // Clear the dialogue text
        dialogueBox.SetActive(false); // Hide the dialogue box
    }









}