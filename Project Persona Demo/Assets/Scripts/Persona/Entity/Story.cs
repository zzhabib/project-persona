namespace Persona.Entity
{
    public class Story
    {
        public int Id;
        public string Title;
        public string Description;

        public override string ToString()
        {
            return Title;
        }
    }
}