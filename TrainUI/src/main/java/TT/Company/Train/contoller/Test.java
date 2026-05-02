package TT.Company.Train.contoller;

import TT.Company.Train.Repo.StationRepo;
import TT.Company.Train.Repo.TrainRepo;
import TT.Company.Train.Repo.TrainScheduleRepo;
import TT.Company.Train.entity.Station;
import TT.Company.Train.entity.Train;
import TT.Company.Train.entity.TrainSchedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/test")
@CrossOrigin
public class Test {
    @Autowired
    private StationRepo stationRepo;
    @Autowired
    private TrainRepo trainRepo;
    @Autowired
    private TrainScheduleRepo trainScheduleRepo;
    @GetMapping("/addTrain")
    public void testAdd(){
        Station s1=new Station(null,"Mumbai","MM");
        Station s2=new Station(null,"Bhopal","BHP");
        Station s3=new Station(null,"Narshingpur","NAR");
        Station s4=new Station(null,"Gadarwara","GDR");
        Station s5=new Station(null,"Chindwara","CHI");
        Station s6=new Station(null,"Kolkata","KK");
        stationRepo.saveAll(List.of(s1,s2,s3,s4,s5,s6));

        Train t1=new Train(null,"Rajdhani Express","89730",null);
        Train t2=new Train(null,"Intercity Express","99740",null);
        Train t3=new Train(null,"RaniKamlapati Express","29739",null);
        Train t4=new Train(null,"Rewa Express","29830",null);
        Train t5=new Train(null,"Panchvalley Express","69730",null);
        trainRepo.saveAll(List.of(t1,t2,t3,t4,t5));

        TrainSchedule sc1=new TrainSchedule(null,t1,s1,s6,"4:00","15:35");
        TrainSchedule sc2=new TrainSchedule(null,t2,s2,s3,"5:00","8:35");
        TrainSchedule sc3=new TrainSchedule(null,t3,s4,s2,"7:15","10:55");
        TrainSchedule sc4=new TrainSchedule(null,t5,s5,s2,"6:00","12:35");
        TrainSchedule sc5=new TrainSchedule(null,t4,s1,s6,"0:00","15:35");
        trainScheduleRepo.saveAll(List.of(sc1,sc2,sc3,sc4,sc5));

        System.out.println("Data inserted in database");
    }

}
