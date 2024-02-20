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
        private bool isLoaded = false;

        private List<User> users = new List<User>();

        private int SelectedUserId
        {
            get { return _personaProvider.User?.Id ?? 0; }
        }

        private IEnumerable<string> storyOptions = new List<string>();
        private int selectedStoryIndex = 0;

        public void OnEnable()
        {
            _personaProvider = (PersonaProvider)target;
            EditorCoroutineUtility.StartCoroutine(FetchUsers(), this);
        }

        IEnumerator FetchUsers()
        {
            var task = UserQueries.GetAllUsers();
            yield return new WaitUntil(() => task.IsCompleted);

            try
            {
                users = task.Result.ToList();
                isLoaded = true;
            }
            catch (System.Exception ex)
            {
                Debug.LogError($"Failed to load user options: {ex.Message}");
                isLoaded = false;
            }

            Repaint(); // Ensure the UI is updated
        }

        IEnumerator FetchStories()
        {
            Debug.Log("Fetch Stories");

            yield return null;

            Repaint();
        }

        public override void OnInspectorGUI()
        {
            if (!isLoaded)
            {
                EditorGUILayout.LabelField("Loading user options...");
                return;
            }

            int selectedIndex = users.FindIndex(u => u.Id == SelectedUserId);
            int newIndex = EditorGUILayout.Popup("User", selectedIndex, users.Select(u => u.Email).ToArray());
            if (newIndex != selectedIndex)
            {
                _personaProvider.User = users[newIndex];
                EditorCoroutineUtility.StartCoroutine(FetchStories(), this);
            }
        }
    }
}