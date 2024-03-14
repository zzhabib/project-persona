using System;
using UnityEngine;
using UnityEngine.Serialization;

namespace Persona
{
    public class PersonaNpc : MonoBehaviour
    {
        public PersonaProvider PersonaProvider;
        public Entity.Persona persona;

        private void Start()
        {
            if (PersonaProvider == null)
            {
                PersonaProvider = PersonaProvider.Instance;
            }
        }
    }
}