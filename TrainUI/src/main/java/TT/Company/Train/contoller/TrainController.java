package TT.Company.Train.contoller;

import TT.Company.Train.entity.Station;
import TT.Company.Train.entity.Train;
import TT.Company.Train.service.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@CrossOrigin
public class TrainController {

    @Autowired
    private TrainService trainService;
    public TrainController(TrainService trainService){
        this.trainService=trainService;
    }
    @GetMapping("/trains")
    public List<Train> getAllTrains(){
        return trainService.getAllTrains();
    }
    @GetMapping("/stations")
    public List<Station> getAllStation(){
        return trainService.getAllStation();
    }
    @PostMapping
    public Train insertTrain(@RequestBody Train train){
       return trainService.insertTrain(train);
    }
}
