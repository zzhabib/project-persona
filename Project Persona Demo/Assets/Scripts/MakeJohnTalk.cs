using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Persona;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.Assertions;

public class MakeJohnTalk : MonoBehaviour
{
    public PersonaNpc OtherPersona;
    
    private PersonaNpc _personaNpc;
    
    void Start()
    {
        Talk();
    }

    async void Talk()
    {
        await Task.Delay(1000);
        _personaNpc = GetComponent<PersonaNpc>();
        OtherPersona.MessageCreated.AddListener((text) =>
        {
            Debug.Log($@"Got a reply from {OtherPersona.persona.Name}: {text}");
        });
        
        OtherPersona.CreateReply(_personaNpc, "Hi, nice to meet you! What are you doing here?");
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
