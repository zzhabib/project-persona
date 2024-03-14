using System;
using System.Collections.Generic;

namespace Persona.Entity
{
    [Serializable]
    public class User
    {
        public int Id = -1;
        public string Email;
        public IEnumerable<Story> Stories;
        public IEnumerable<StorySession> StorySessions;

        public override string ToString()
        {
            return Email;
        }
    }
}