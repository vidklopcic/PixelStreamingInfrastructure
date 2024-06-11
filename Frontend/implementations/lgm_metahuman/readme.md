# Specialized Training System for Interviewing Child Victims in Judicial Proceedings

This project aims to develop a pilot training system for professionals who interact with child victims in judicial settings. The system enables communication between two adults, where the first person (instructor) controls an avatar to respond to questions from the second person (student) through various scenarios reflecting real-life interviews with juvenile victims in court proceedings. A third person can passively participate by monitoring the live stream of both participants (supervisor).

## System Components

The system consists of three main parts:

1. Instructor's user interface for imitating a victim of a crime
2. Student's user interface for interviewing the victim
3. Supervisor's user interface for viewing the live stream and administrative oversight

## User Roles

The system supports three basic user roles: instructor, student, and supervisor.

- **Instructor**: Controls the avatar (representing a juvenile victim), expresses emotions, and speaks (with basic pitch change) through their user interface.
- **Student**: Monitors the live stream of the avatar and conducts the interview using a microphone and camera.
- **Supervisor**: Views the live stream of both the instructor and student, and has administrative control.

## Technical Requirements

### Instructor's User Environment

Hardware requirements (hardware not included in the tender):
- iOS mobile device with FaceID sensor
- Laptop with specifications sufficient to run LiveLink in Unreal Engine

Software components:
- Unreal Engine with LiveLink plugin
- Facial motion capture for the avatar
- Voice modification (pitch change)
- Custom user interface for avatar functions and chat

User interface:
- Chat window: Live chat window displaying the conversation
- Child avatar display
- Live stream display: Video showing the student
- Action buttons: Pre-recorded animations for expressions and actions (e.g., crying, standing up, self-harm)
- Avatar selection: Interface elements for switching between different avatars (three male children by age group, three female children by age group, three adult avatars)
- All user interface actions are accessible via keyboard

### Student's User Environment

Hardware requirements (hardware not included in the tender):
- Device with a webcam and microphone

Software components:
- Web browser supporting video conferencing and audio streaming

User interface:
- Chat window: Live chat window displaying the conversation
- Display of the avatar controlled via the instructor's user interface
- Video conferencing stream of the student

### Supervisor's User Environment

Hardware requirements (hardware not included in the tender):
- Device capable of web browsing

Software components:
- Web browser for interaction control and administration

User interface:
- Video conferencing stream of both sides (instructor and student): live streaming of the child avatar and instructor side by side
- Chat window: Live chat window displaying the conversation

## System Architecture

- The instructor's user environment serves as the server and backend for the entire system.
- The student's and supervisor's user environments are clients accessed through a web browser, connecting to the instructor's backend hardware for video conferencing.
- The pilot system includes one room where one training session (instructor-student) can be conducted simultaneously.

## Getting Started

To set up the project locally, follow these steps:

TODO