# _*_ coding: utf-8
__author__ = 'HT11'

import sqlalchemy
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey,create_engine, TIMESTAMP,DATE,TIME,FLOAT
from sqlalchemy.sql import select, between,desc
import csv

import datetime


class dbCreate:
    def __init__(self, engine,filepath):
        self.engine=engine;
        self.metadata=MetaData();
        self.filepath=filepath;
        self.eventTable= Table('event', self.metadata,
            Column('StartTime', TIMESTAMP),
            Column('StopTime', TIMESTAMP),
            Column('SensorID', String(50) ),
            Column('DetectorID', String(50)),
            Column('TypeEstimation', String(100)),
            Column('Confidence', FLOAT),
            Column('Status', FLOAT));

        self.annotationTable= Table('annotations', self.metadata,
            Column('StartTime', TIMESTAMP),
            Column('StopTime', TIMESTAMP),
            Column('Activity', String(100)));

        ''' self.eventTable= Table('event', self.metadata,
            Column('StartTime', TIMESTAMP),
            Column('StopTime', TIMESTAMP),
            Column('SensorID', String(50) ),
            Column('DetectorID', String(50)),
            Column('TypeEstimation', String(100)),
            Column('Index',Integer),
            Column('Start-Date', DATE),
            Column('Stop-Date', DATE),
            Column('Start-Time', TIME),
            Column('Stop-Time', TIME),
            Column('DurationTotalSeconds', Integer),
            Column('WeekOfYear', Integer),
            Column('DayOfWeek', Integer));

        self.annotationTable= Table('annotations', self.metadata,
            Column('StartTime', TIMESTAMP),
            Column('StopTime', TIMESTAMP),
            Column('Activity', String(100)),
            Column('Stop-Date', DATE),
            Column('Stop-Date', DATE),
            Column('Start-Time', TIME),
            Column('Stop-Time', TIME),
            Column('DurationTotalSeconds', Integer));
        '''
    def generateTables(self):
        #self.annotationTable.drop(self.engine, checkfirst=True)
        self.annotationTable.create(self.engine, checkfirst=True)
        #self.eventTable().drop(self.engine, checkfirst=True)
        self.eventTable.create(self.engine, checkfirst=True)


    def importEventData(self):
        eventfileName="smh/events_mod.csv"
        annotaionfileName='smh/annotations_mod.csv'
        annotaionfileName='Final/annotations.csv'
        eventfileName="events.csv"
        conn = self.engine.connect()
        csvfileEvent=self.filepath+eventfileName;
        csvfileAnno=self.filepath+annotaionfileName;
        #eventSchemeTwo={0:'StartTime',2:'StopTime',3:'Activity',4:"Start-Date",5:'Stop-Date',6:'Start-Time',7:'Stop-Time',8: 'DurationTotalSeconds',9:'WeekOfYear',10:'DayOfWeek'};
        eventScheme={0:'StartTime',1:'StopTime',2:'SensorID', 3:'DetectorID',4:'TypeEstimation', 5:'Confidence',6:'Status'}
        annotationScheme={0:'StartTime',1:'StopTime',2:'Activity'}
        #annotationSchemeTwo={0:'StartTime',1:'StopTime',2:'Activity',3:"Start-Date",4:'Stop-Date',5:'Start-Time',6:'Stop-Time',7:'DurationTotalSeconds'};


        self.comprehansionCSVCopy(self.eventTable, csvfileEvent,conn,eventScheme,True)
        self.comprehansionCSVCopy(self.annotationTable, csvfileAnno,conn,annotationScheme,True)

    def comprehansionCSVCopy(self,tablesheme, csvfile,conn,shemeList,hasHeader):
        readfile= open(csvfile, 'rb')
        #readfileReader = csv.reader(readfile, delimiter=',', quotechar=',')
        readfileReader = csv.reader(readfile, delimiter=',')
        #skip firstLine
        if hasHeader:
            next(readfileReader)
        dataList=[]
        i=0;

        for row in readfileReader:
            dataset={}
            for a in range(0,len(shemeList)):
                entry=shemeList[a]
                if entry is 'StartTime' or  entry=='StopTime':
                    out =datetime.datetime.strptime(row[a], "%d-%b-%Y %H:%M:%S")
                    dataset[entry]=out;
                else:
                    dataset[entry]=row[a];


            dataList.append(dataset)

        if(i% 1000):
            print(dataList)
            conn.execute(tablesheme.insert(),dataList)
            dataList=[]
        i+=1
        readfile.close()
        if len(dataList)!=0 :
            conn.execute(tablesheme.insert(),dataList)
            dataList=[]

class dbgetTimes:
    def __init__(self, engineOne,engineTwo):
        self.engineOne=engineOne;
        self.engineTwo=engineTwo;
        self.metadata=MetaData();

        self.eventTable= Table('event', self.metadata,
            Column('StartTime', TIMESTAMP),
            Column('StopTime', TIMESTAMP),
            Column('SensorID', String(50) ),
            Column('DetectorID', String(50)),
            Column('TypeEstimation', String(100)),
            Column('Confidence', FLOAT),
            Column('Status', FLOAT));

        self.annotationTable= Table('annotations', self.metadata,
            Column('StartTime', TIMESTAMP),
            Column('StopTime', TIMESTAMP),
            Column('Activity', String(100)));

    def getTimes(self):
        connOne=self.engineOne.connect()
        connOne=self.engineTwo.connect()
        sAnno=select([self.annotationTable.c.StartTime,self.annotationTable.c.StopTime,self.annotationTable.c.Activity])
        sEvent= select([self.eventTable.c.StartTime.label("StartTimeEvent"),self.eventTable.c.StopTime,self.eventTable.c.SensorID,self.eventTable.c.DetectorID,self.eventTable.c.TypeEstimation,\
                        self.eventTable.c.Confidence,self.eventTable.c.Status,self.annotationTable.c.Activity])\
                        .where(between(self.eventTable.c.StartTime, self.annotationTable.c.StartTime, self.annotationTable.c.StopTime)).where(between(self.eventTable.c.StopTime, \
                        self.annotationTable.c.StartTime, self.annotationTable.c.StopTime)).group_by(self.eventTable.c.StartTime).group_by(self.eventTable.c.StopTime)\
                        .group_by(self.eventTable.c.SensorID).group_by(self.eventTable.c.DetectorID).group_by(self.eventTable.c.TypeEstimation)\
                        .group_by(self.eventTable.c.Confidence).group_by(self.eventTable.c.Status)\
                        .group_by(self.annotationTable.c.Activity).order_by(self.eventTable.c.StartTime)
                        #.group_by(self.annotationTable.c.StopTime).group_by(self.annotationTable.c.StartTime),self.annotationTable.c.StartTime,self.annotationTable.c.StopTime
        result= connOne.execute(sEvent)

        csFile = open('C:/Users/HT11/Desktop/out2.csv', 'wb')
        outwriter = csv.writer(csFile, delimiter=' ',quotechar='|', quoting=csv.QUOTE_MINIMAL)

        i=0;
        timeStamper=None
        for row in result:
            '''if i==0:

                timeStamper=row["StartTimeEvent"];
                outwriter.writerow(row)
            else:

                while(row["StartTimeEvent"]> timeStamper):
                    outwriter.writerow([timeStamper])
                    timeStamper = timeStamper + datetime.timedelta(0,1)

                timeStamper=row["StartTimeEvent"];'''
            outwriter.writerow(row)

            i=i+1;

if __name__ == "__main__":
    engine = create_engine('mysql://HT11:Password1@10.67.150.203/smart_home')
    engineSec = create_engine('mysql://HT11:Password1@10.67.150.203/smart_home')
    #engine = create_engine('mysql+mysqlconnector://HT11:Password1@10.67.150.203/smart_home')
    #engine = create_engine('mysql://HT11:Password1@10.67.150.203/smart_home')
    #dbc = dbCreate(engine,'C:/Users/HT11/Desktop/');
    #dbc.generateTables();
    #dbc.importEventData();
    newFunc =dbgetTimes(engine,engineSec)
    newFunc.getTimes()


#