package TT.Company.Train.Repo;

import TT.Company.Train.entity.TrainSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainScheduleRepo extends JpaRepository<TrainSchedule,Long> {
//    @Query(value = "SELECT ts.* FROM train_schedule ts " +
//            "JOIN station s1 ON ts.source_station_id = s1.id " +
//            "JOIN station s2 ON ts.destination_station_id = s2.id " +
//            "WHERE s1.station_name = ?1 " +
//            "AND s2.station_name = ?2",
//            nativeQuery = true)
    List<TrainSchedule> findBySource_StationCodeAndDestination_StationCode(String sourceCode,String destinationCode);
    List<TrainSchedule> findBySource_StationNameAndDestination_StationName(String sourceName,String destinationName);
}
