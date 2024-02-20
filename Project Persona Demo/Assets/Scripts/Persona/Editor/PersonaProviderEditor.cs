using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Persona.Query;
using Unity.EditorCoroutines.Editor;
using UnityEditor;
using UnityEngine;

namespace Persona.Editor
{

    [CustomEditor(typeof(PersonaProvider))]
    public class PersonaProviderEditor : UnityEditor.Editor
    {
        private IEnumerable<string> userOptions = new List<string>();
        private bool isLoaded = false;

        private int selectedUserIndex = 0;


        public void OnEnable()
        {
            EditorCoroutineUtility.StartCoroutine(FetchUsers(), this);
        }

        IEnumerator FetchUsers()
        {
            var task = UserQueries.GetAllUsers();
            yield return new WaitUntil(() => task.IsCompleted);

            try
            {
                userOptions = task.Result.Select(u => u.ToString());
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
            yield break;

            Repaint();
        }

        public override void OnInspectorGUI()
        {
            if (!isLoaded)
            {
                EditorGUILayout.LabelField("Loading user options...");
                return;
            }

            int newIndex = EditorGUILayout.Popup("User", selectedUserIndex, userOptions.ToArray());
            if (newIndex != selectedUserIndex)
            {
                selectedUserIndex = newIndex;
                EditorCoroutineUtility.StartCoroutine(FetchStories(), this);
            }
        }
    }
}