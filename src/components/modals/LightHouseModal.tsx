import { Button } from "@/components/ui/button";
import CourseFeatures from "../CourseFeatures";
import DefaultModal from "./DefaultModal";
import Tags from "../Tags";

const LightHouseModal = () => {
    const tags = [
        "Beginner",
        "CLI",
        "Fundamental Programming",
        "Java",
        "JUnit",
        "Unit Testing",
        "Testing",
      ];

    return (

        <DefaultModal top="10%" right="65%">
            <div className="flex flex-col items-center gap-4 w-full h-full">
                <h1 className="text-3xl font-semibold p-5">Light House</h1>
                <CourseFeatures
                    duration="3 hours"
                    lectures={46}
                    skillLevel="All level"
                    language="English"
                    assessments={true}
                    quizzes="NA"
                />
                <Tags tags={tags}/>
                <Button className="bg-blue-700/85 backdrop-blur-xl rounded-full w-[95%] h-[10%] font-light text-2xl text-white">Start Learning</Button>
            </div>
        </DefaultModal>
    );
};

export default LightHouseModal;
