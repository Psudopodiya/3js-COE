import React from 'react';

interface CourseFeaturesProps {
  duration: string;
  lectures: number;
  skillLevel: string;
  language: string;
  assessments: boolean;
  quizzes: string;
}

const CourseFeatures: React.FC<CourseFeaturesProps> = ({ duration, lectures, skillLevel, language, assessments, quizzes }) => {
  return (
    <div className= "absolute bg-white/40 p-3 rounded-3xl w-[95%] max-h-120 backdrop-blur-xl font-semibold ">
      <h2 className="mb-4">Course Features</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
            <img src="../../public/duration.svg" className='bg-white w-10 h-10 p-2 rounded-xl' ></img>
          <div>
            <h3 className="text-[10px] text-blue-700">Duration</h3>
            <p className='text-sm'>{duration}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
        <img src="../../public/lectures.svg" className='bg-white w-10 h-10 p-2 rounded-xl' ></img>
          <div>
            <h3 className="text-[10px] text-blue-700">Lectures</h3>
            <p className='text-sm'>{lectures}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
        <img src="../../public/skill.svg" className='bg-white w-10 h-10 p-2 rounded-xl'></img>
          <div>
            <h3 className="text-[10px] text-blue-700">Skill level</h3>
            <p className='text-sm'>{skillLevel}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
        <img src="../../public/language.svg" className='bg-white w-10 h-10 p-2 rounded-xl'></img>
          <div>
            <h3 className="text-[10px] text-blue-700">Language</h3>
            <p className='text-sm'>{language}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
        <img src="../../public/assessment.svg" className='bg-white w-10 h-10 p-2 rounded-xl'></img>
          <div>
            <h3 className="text-[10px] text-blue-700">Assessments</h3>
            <p className='text-sm'>{assessments ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
        <img src="../../public/quiz.svg" className='bg-white w-10 h-10 p-2 rounded-xl'></img>
          <div>
            <h3 className="text-[10px] text-blue-700">Quizzes</h3>
            <p className='text-sm'>{quizzes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFeatures;


