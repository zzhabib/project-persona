using System;

namespace Persona.Entity
{
    [Serializable]
    public class Message
    {
        public int Id = -1;
        public DateTime CreatedAt;
        public Persona Recipient;
        public Persona Sender;
        public Scene Scene;
        public string Text;
    }
}