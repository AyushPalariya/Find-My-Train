package TT.Company.Train;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TrainApplication {
	public static void main(String[] args) {
		SpringApplication.run(TrainApplication.class, args);
	}
	//run method laod or read the configuration that present inside the appli.property or yml file
	//then create allicationContext of ioc and start ioc container that is used to manage the lifecycle of beans
	//after that it scan all the classes using componentscan annotation and create bean for classes like controller
	//service and repository.
	//now sb application automatically configure the beans based on dependecy that preent in class path.

}
