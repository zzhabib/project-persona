namespace Persona.Entity
{
    public class User
    {
        public int Id;
        public string Email;

        public override string ToString()
        {
            return Email;
        }
    }
}