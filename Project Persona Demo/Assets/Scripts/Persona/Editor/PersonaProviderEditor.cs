using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Persona.Entity;
using Persona.Query;
using Unity.EditorCoroutines.Editor;
using UnityEditor;
using UnityEngine;

namespace Persona.Editor
{

    [CustomEditor(typeof(PersonaProvider))]
    public class PersonaProviderEditor : UnityEditor.Editor
    {
        private PersonaProvider _personaProvider;

        private List<User> users = new List<User>();
        private bool usersLoaded = false;
        
        private List<Story> stories = new List<Story>();
        private bool storiesLoaded = false;

        private int SelectedUserId
        {
            get { return _personaProvider.User?.Id ?? -1; }
        }

        private int SelectedStoryId
        {
            get { return _personaProvider.Story?.Id ?? -1; }
        }

        public void OnEnable()
        {
            _personaProvider = (PersonaProvider)target;
            EditorCoroutineUtility.StartCoroutine(FetchUsers(), this);

            if (SelectedUserId != -1)
            {
                EditorCoroutineUtility.StartCoroutine(FetchStories(), this);
            }
        }

        IEnumerator FetchUsers()
        {
            var task = UserQueries.GetAllUsers();
            yield return new WaitUntil(() => task.IsCompleted);

            try
            {
                users = task.Result.ToList();
                usersLoaded = true;
            }
            catch (System.Exception ex)
            {
                Debug.LogError($"Failed to load user options: {ex.Message}");
                usersLoaded = false;
            }

            Repaint(); // Ensure the UI is updated
        }

        IEnumerator FetchStories()
        {
            var task = UserQueries.GetUserData(SelectedUserId);
            yield return new WaitUntil(() => task.IsCompleted);

            stories = task.Result.Stories.ToList();
            storiesLoaded = true;
            
            Repaint();
        }

        public override void OnInspectorGUI()
        {
            if (!usersLoaded)
            {
                EditorGUILayout.LabelField("Loading user options...");
                return;
            }

            int selectedUserIdx = users.FindIndex(u => u.Id == SelectedUserId);
            int newUserIdx = EditorGUILayout.Popup("User", selectedUserIdx, users.Select(u => u.Email).ToArray());
            if (newUserIdx != selectedUserIdx)
            {
                _personaProvider.User = users[newUserIdx];
                EditorCoroutineUtility.StartCoroutine(FetchStories(), this);
            }

            if (storiesLoaded)
            {
                int selectedStoryIdx = stories.FindIndex(s => s.Id == SelectedStoryId);
                int newStoryIdx = EditorGUILayout.Popup("Story", selectedStoryIdx, stories.Select(s => s.Title).ToArray());
                if (newStoryIdx != selectedStoryIdx)
                {
                    _personaProvider.Story = stories[newStoryIdx];
                }
            }
        }
    }
}