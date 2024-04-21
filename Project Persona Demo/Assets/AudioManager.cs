using UnityEngine;

public class AudioManager : MonoBehaviour
{
    public AudioRecord audioRecorder;
    public AudioSource audioSource;

    public void StartPlayback()
    {
        AudioClip clip = audioRecorder.GetRecordedClip();
        if (clip != null)
        {
            audioSource.clip = clip;
            audioSource.Play();
        }
        else
        {
            Debug.LogWarning("No recorded clip available.");
        }
    }
}
