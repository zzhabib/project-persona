using System;
using DefaultNamespace;
using GraphQL;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using UnityEngine;

public class Test : UnityEngine.MonoBehaviour
{
    private GraphQLHttpClient graphQLClient = new GraphQLHttpClient("http://localhost:4000", new NewtonsoftJsonSerializer());
    
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

        var response = await graphQLClient.SendQueryAsync<GraphQLResponse<TestQueryResult>>(request);
        var result = response.Data.Data;
        
        Debug.Log("Received Query Response");

        foreach (var user in result.allUsers)
        {
            Debug.Log($@"{user.Id}: {user.Email}");
        }
    }
}