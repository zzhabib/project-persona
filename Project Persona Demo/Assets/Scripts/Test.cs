using System;
using System.Linq;
using GraphQL;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using Persona;
using UnityEngine;



public class Test : UnityEngine.MonoBehaviour
{
    private GraphQLHttpClient graphQLClient = new GraphQLHttpClient("http://146.190.161.212/api", new NewtonsoftJsonSerializer());
    
    private void Start()
    {
        RunTestQuery();
    }

    private async void RunTestQuery()
    {
        Debug.Log("Running Test Query");
        var request = new GraphQLRequest
        {
            Query = @"
                query TestQuery {
                  allUsers {
                    id
                    email
                  }
                }
            "
        };

        var response = await graphQLClient.SendQueryAsync<TestQueryResult>(request);
        var result = response.Data;
        



        var a = await Persona.Query.StoryQueries.GetStoryData(1);



        Debug.Log("story data: " + a.ToString());


        Debug.Log("Received Query Response");

        foreach (var user in result.allUsers)
        {
            Debug.Log($@"{user.Id}: {user.Email}");
        }
    }
}