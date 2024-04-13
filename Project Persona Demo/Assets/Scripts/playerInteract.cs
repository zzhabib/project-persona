using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Persona.Query;
using System.Threading.Tasks;

public class playerInteract : MonoBehaviour
{
    public InputField inputField; // Reference to the InputField

    private bool isInteracting = false;

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.E) && !isInteracting)
        {
            StartInteraction();
        }
    }

    private void StartInteraction()
    {
        float interactRange = 2f;
        Collider[] colliderArray = Physics.OverlapSphere(transform.position, interactRange);
        foreach (Collider collider in colliderArray)
        {
            if (collider.isTrigger)
            {
                UnityEngine.Debug.Log("Interacting with: " + collider.name);
                BeginInputInteraction();
                break;
            }
        }
    }

    private void BeginInputInteraction()
    {
        //PlayerMovement.canMove = false; // Disable player movement
        inputField.gameObject.SetActive(true);
        inputField.ActivateInputField();
        inputField.Select();
        inputField.onSubmit.AddListener(EndInputInteraction); // Listen for submit event
        isInteracting = true;
    }

    private async void EndInputInteraction(string inputText)
    {
        if (inputText != "")
        {
            int storySessionId = 1;
            int sceneId = 1;
            int senderPersonaId = 1;
            int recipientPersonaId = 2;

            var resp = await Persona.Query.UserQueries.CreateUserMessage(storySessionId, sceneId, senderPersonaId, recipientPersonaId, inputText);
            UnityEngine.Debug.Log("Message sent: " + resp.Text);
        }

        // Clean up
        inputField.onSubmit.RemoveListener(EndInputInteraction); // Remove listener
        inputField.text = "";
        inputField.gameObject.SetActive(false);
        //PlayerMovement.canMove = true; // Enable player movement
        isInteracting = false;
    }
}