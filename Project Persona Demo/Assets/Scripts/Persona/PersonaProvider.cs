using Persona.Entity;
using UnityEngine;

namespace Persona
{
    public class PersonaProvider : MonoBehaviour
    {
        public static PersonaProvider Instance { get; private set; }
        
        public User User;
        public Story Story;
        public Scene Scene;

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
            }
            else
            {
                Debug.LogError("Only one PersonaProvider can exist at a time!");
                Destroy(gameObject);
            }
        }
    }
}