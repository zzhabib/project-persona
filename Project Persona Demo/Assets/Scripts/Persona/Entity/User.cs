using System.Collections.Generic;

namespace Persona.Entity
{
    public class User
    {
        public int Id;
        public string Email;
        public IEnumerable<Story> Stories;

        public override string ToString()
        {
            return Email;
        }
    }
}