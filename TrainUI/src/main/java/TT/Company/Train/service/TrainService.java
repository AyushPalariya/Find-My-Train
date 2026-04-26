package TT.Company.Train.service;

import TT.Company.Train.Repo.StationRepo;
import TT.Company.Train.Repo.TrainRepo;
import TT.Company.Train.entity.Station;
import TT.Company.Train.entity.Train;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainService {
    @Autowired
    private TrainRepo trainRepo;
    @Autowired
    private StationRepo stationRepo;
    public TrainService(TrainRepo trainRepo){
        this.trainRepo=trainRepo;
    }
    public List<Train> getAllTrains() {
        return trainRepo.findAll();
    }

    public Train insertTrain(Train train) {
        return trainRepo.save(train);
    }

    public List<Station> getAllStation() {
        return stationRepo.findAll();
    }
}
