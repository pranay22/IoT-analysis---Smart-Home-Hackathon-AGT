Smart home dataset consist of two files: annotations and events. Annotations are the groundtruth labels that are assigned to different activities happening in the house. Events are the output of the sensors that are installed in the house. Events are the messages that issued asynchronously as soon as the sensors detect sensing occurrence happening. Sensors are not perfectly reliable and can produce faulty events or miss some of them.

Example of the annotation file
Header: StartTime, StopTime, Activity
Line:   07-Dec-2014 14:45:51,07-Dec-2014 14:50:54,Showering

'Activity' can take one out of six following values:
Continence
Personal Hygiene
Showering
Food Preparation
Other activity in kitchen
Other activity in bathroom


Example of the event file
Header: StartTime, StopTime, SensorID, DetectorId, TypeEstimation, Confidence, Status
Line:   07-Dec-2014 14:45:46,07-Dec-2014 14:45:54,605,LocationDetector,person_next_to_shower,0.714286,1

Every sensor has its unique 'SensorID' that is the sensor identifier, 'DetectorId' that is a type of the sensor. Each event has a field   
'TypeEstimation' that is the estimated type of action that the sensor registered. 'Confidence' reflects the level of certainty of the action.  
'Status' flag show if the whole setup was functioning when the event was issued. Events with 'Status' 0 should not be considered.

List of unique 'SensorID'
Kitchen:
00:13:A2:00:40:8A:D2:EF-LOAD
00:13:A2:00:40:8A:D3:43-LOAD
00:13:A2:00:40:79:66:8A-MD
00:13:A2:00:40:79:66:7B-MD
00:13:A2:00:40:7E:7B:4E-MD
00:13:A2:00:40:86:68:21-CONTACT1_TRIGGERED
00:13:A2:00:40:8A:8B:F8-CONTACT1_TRIGGERED
00:13:A2:00:40:8A:8C:2B-CONTACT1_TRIGGERED
603
702
SmartPhone

Bathroom:
00:13:A2:00:40:81:42:3F-MD
00:13:A2:00:40:7E:7C:27-MD
602
605
703
704
SmartPhone



Note that the dataset was recorder not in a natural way. So, do not expect that the activities are coming in the logical order e.g. first 'Continence' and then 'Personal Hygiene'. It could be that the 'Continence' activity is repeated several times in a row. The same holds for all other activities.