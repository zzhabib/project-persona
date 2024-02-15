using System.Collections.Generic;

namespace DefaultNamespace
{
    public class TestQueryResult
    {
        public IList<User> allUsers;

        public class User
        {
            public int Id;
            public string Email;
        }
    }
}