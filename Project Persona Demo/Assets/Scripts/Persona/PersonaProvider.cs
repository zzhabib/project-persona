using Persona.Entity;
using Persona.Query;
using UnityEngine;

namespace Persona
{
    public class PersonaProvider : MonoBehaviour
    {
        public static PersonaProvider Instance { get; private set; }

        // Editable fields
        public User User;
        public Story Story;
        public Scene Scene;

        // Only used in run-time
        public StorySession StorySession;

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