using System;
using System.Collections.Generic;

namespace Persona.Entity
{
    [Serializable]
    public class Story
    {
        public int Id = -1;
        public string Title;
        public string Description;
        public List<Scene> Scenes;
        public List<Persona> Personas;

        public override string ToString()
        {
            return Title;
        }
    }
}