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
    <div className= "bg-white/40 py-4 px-3 rounded-3xl w-[95%] max-h-120 backdrop-blur-xl font-semibold ">
      <h4 className="mb-2 font-normal">Course Features</h4>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
            <img src="/duration.svg" className='bg-white w-10 h-10 p-2 rounded-xl' ></img>
          <div>
            <h3 className="text-[10px] text-blue-700">Duration</h3>
            <p className='text-sm'>{duration}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
        <img src="/lectures.svg" className='bg-white w-10 h-10 p-2 rounded-xl' ></img>
          <div>
            <h3 className="text-[10px] text-blue-700">Lectures</h3>
            <p className='text-sm'>{lectures}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
        <img src="/skill.svg" className='bg-white w-10 h-10 p-2 rounded-xl'></img>
          <div>
            <h3 className="text-[10px] text-blue-700">Skill level</h3>
            <p className='text-sm'>{skillLevel}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
        <img src="/language.svg" className='bg-white w-10 h-10 p-2 rounded-xl'></img>
          <div>
            <h3 className="text-[10px] text-blue-700">Language</h3>
            <p className='text-sm'>{language}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
        <img src="/assessment.svg" className='bg-white w-10 h-10 p-2 rounded-xl'></img>
          <div>
            <h3 className="text-[10px] text-blue-700">Assessments</h3>
            <p className='text-sm'>{assessments ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
        <img src="/quiz.svg" className='bg-white w-10 h-10 p-2 rounded-xl'></img>
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


