using System;

namespace Persona.Entity
{
    [Serializable]
    public class Scene
    {
        public int Id = -1;
        public string Title;
        public string Description;

        public override string ToString()
        {
            return Title;
        }
    }
}