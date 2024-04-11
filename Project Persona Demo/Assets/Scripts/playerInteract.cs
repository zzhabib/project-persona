using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Persona.Query;
using System.Threading.Tasks;
using GraphQL;
using Persona.Entity;



public class playerInteract : MonoBehaviour
{
    private async Task Update()
    {
        if (Input.GetKeyDown(KeyCode.E))
        {
            float interactRange = 2f;
            Collider[] colliderArray = Physics.OverlapSphere(transform.position, interactRange);
            foreach (Collider collider in colliderArray)
            {
                if (collider.isTrigger)
                {
                    Debug.Log(collider.name);

                    int storySessionId = 1;
                    int sceneId = 1;
                    int senderPersonaId = 1;
                    int recipientPersonaId = 2;
                    string text = "hello";



                    

                    var resp = await Persona.Query.UserQueries.CreateUserMessage(storySessionId, sceneId, senderPersonaId,recipientPersonaId, text);
                    
                    Debug.Log(resp.Text);

                }

            }

        }
    }
}
