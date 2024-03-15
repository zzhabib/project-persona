using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using Unity.VisualScripting;

[CustomEditor(typeof(ColliderMacro))]
public class ColliderMacroEditor : UnityEditor.Editor
{
	public override void OnInspectorGUI()
	{
		if (GUILayout.Button("Spawn Colliders")) {
			Debug.Log("hilo");

			var t = (ColliderMacro) target;
			for (int i = 0; i < t.gameObject.transform.childCount; i++) {
				var child = t.gameObject.transform.GetChild(i);
				if (child.GetComponent<MeshRenderer>() != null) {
					child.AddComponent<MeshCollider>();
				}
			}
		}
	}
}
