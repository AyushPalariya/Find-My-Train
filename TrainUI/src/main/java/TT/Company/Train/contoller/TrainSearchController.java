package TT.Company.Train.contoller;

import TT.Company.Train.entity.TrainSchedule;
import TT.Company.Train.service.TrainSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/train/search")
@CrossOrigin
public class TrainSearchController {
    @Autowired//agar ek hi hai to optional
    private TrainSearchService trainSearchService;
    public TrainSearchController(TrainSearchService trainSearchService){
        this.trainSearchService=trainSearchService;
    }
    @GetMapping("/byCode")
    public List<TrainSchedule> findTrainByStationCode(@RequestParam String sourceCode,@RequestParam String destinationCode){
        return trainSearchService.findTrainByStationCode(sourceCode.toUpperCase(),destinationCode.toUpperCase());
    }

    @GetMapping("/byName")
    public List<TrainSchedule> findTrainByStationName(@RequestParam String sourceName,@RequestParam String destinationName){
        return trainSearchService.findTrainByStationName(sourceName.toUpperCase(),destinationName.toUpperCase());
    }
}
