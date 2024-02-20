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
        public IEnumerable<Scene> Scenes;

        public override string ToString()
        {
            return Title;
        }
    }
}