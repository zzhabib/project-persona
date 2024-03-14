using System;

namespace Persona.Entity
{
    [Serializable]
    public class StorySession
    {
        public int Id = -1;
        public string Name = "";
        public Story story;

        public override string ToString()
        {
            return $"Story Session ID {Id}, story: {story}";
        }
    }
}