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

        public void OnEnable()
        {
            EditorCoroutineUtility.StartCoroutine(FetchData(), this);
        }

        IEnumerator FetchData()
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

        public override void OnInspectorGUI()
        {
            if (!isLoaded)
            {
                EditorGUILayout.LabelField("Loading user options...");
                return;
            }

            // Example of creating a dropdown list with the loaded user options
            int selectedIndex = EditorGUILayout.Popup("User", 0, userOptions.ToArray());
            // Handle the selected index as needed
        }
    }
}