using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Persona;
using Persona.Entity;
using UnityEngine;

public class Initializer : MonoBehaviour
{
    void Start()
    {
        // Attempt to automatically find a story session to use.
        // TODO: make some sort of selection screen for the story session.
        var personaProvider = PersonaProvider.Instance;
        
        var story = PersonaProvider.Instance.Story;
        var storySession =
            PersonaProvider.Instance.User.StorySessions.FirstOrDefault(ss => ss.story.Id == story.Id);

        if (storySession == null) Debug.LogError("Could not automatically find a story session!");

        PersonaProvider.Instance.StorySession = storySession;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
