package TT.Company.Train.service;

import TT.Company.Train.Repo.TrainScheduleRepo;
import TT.Company.Train.entity.TrainSchedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainSearchService {
    @Autowired
    private TrainScheduleRepo trainScheduleRepo;
    public TrainSearchService( TrainScheduleRepo trainScheduleRepo){
        this.trainScheduleRepo=trainScheduleRepo;
    }
    public List<TrainSchedule> findTrainByStationCode(String sourceCode, String destinationCode) {
        return trainScheduleRepo.findBySource_StationCodeAndDestination_StationCode(sourceCode,destinationCode);
    }

    public List<TrainSchedule> findTrainByStationName(String sourceName, String destinationName) {
        return trainScheduleRepo.findBySource_StationNameAndDestination_StationName(sourceName,destinationName);
    }
}
