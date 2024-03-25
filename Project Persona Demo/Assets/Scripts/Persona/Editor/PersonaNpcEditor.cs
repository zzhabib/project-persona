using System;
using System.Linq;
using Persona.Entity;
using Persona.Query;
using UnityEditor;

namespace Persona.Editor
{
    [CustomEditor(typeof(PersonaNpc))]
    public class PersonaNpcEditor : UnityEditor.Editor
    {
        private PersonaNpc _personaNpc;

        private int selectedPersonaId
        {
            get { return _personaNpc.persona?.Id ?? -1; }
        }

        private void OnEnable()
        {
            _personaNpc = (PersonaNpc)target;
        }

        public override void OnInspectorGUI()
        {
            _personaNpc.PersonaProvider = (PersonaProvider)EditorGUILayout.ObjectField("Persona Provider", _personaNpc.PersonaProvider, typeof(PersonaProvider), true);
            
            if (_personaNpc.PersonaProvider != null && _personaNpc.PersonaProvider.Story != null)
            {
                Story story = _personaNpc.PersonaProvider.Story;
                var personas = story.Personas.ToList();
                int selectedPersonaIdx = personas.FindIndex(p => p.Id == selectedPersonaId);
                int newPersonaIdx = EditorGUILayout.Popup("Persona", selectedPersonaIdx,
                    personas.Select(p => p.Name).ToArray());

                if (newPersonaIdx != selectedPersonaIdx)
                {
                    Undo.RecordObject(_personaNpc, "Change Persona");
                    _personaNpc.persona = personas[newPersonaIdx];
                    EditorUtility.SetDirty(this);
                }
            }
            
            if (_personaNpc.PersonaProvider != null && _personaNpc.PersonaProvider.Story == null)
            {
                EditorGUILayout.LabelField("Please select the story for the given PersonaProvider in order to proceed.");
            }
        }
    }
}