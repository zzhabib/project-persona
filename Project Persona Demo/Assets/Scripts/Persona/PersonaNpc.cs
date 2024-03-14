using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Persona.Entity;
using Persona.Query;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.Serialization;

namespace Persona
{
    public class PersonaNpc : MonoBehaviour
    {
        public PersonaProvider PersonaProvider;
        public Entity.Persona persona;

        public UnityEvent<string> MessageCreated = new UnityEvent<string>();

        private Queue<Message> messageQueue = new(); 

        private void Start()
        {
            if (PersonaProvider == null)
            {
                PersonaProvider = PersonaProvider.Instance;
            }
        }

        /// <summary>
        /// Send a message to the persona. This will cause the Persona to write a reply message.
        /// </summary>
        /// <param name="from">The Persona to send the message from</param>
        /// <param name="text">The content of the message</param>
        public async void CreateReply(PersonaNpc from, string text)
        {
            var personaProvider = PersonaProvider.Instance;
            var replyMessage = await UserQueries.CreateUserMessage(personaProvider.StorySession.Id, personaProvider.Scene.Id, from.persona.Id,
                persona.Id, text);
            
            messageQueue.Enqueue(replyMessage);
        }

        private void Update()
        {
            while (messageQueue.Count > 0)
            {
                MessageCreated.Invoke(messageQueue.Dequeue().Text);
            }
        }
    }
}