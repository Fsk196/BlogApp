import React from "react";
import { useSelector } from "react-redux";
import MiddleCard from "../../components/MiddleCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const Home = () => {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <div className="w-full h-full flex flex-col justify-center gap-2 items-center container mx-auto">
      <div className="w-full container mx-auto h-24 flex justify-start mr-20 items-center gap-3">
        <Select>
          <SelectTrigger className="w-[100px]" isIcon="true">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="">Blog</SelectLabel>
              <SelectItem value="apple">New Blog</SelectItem>
              <SelectItem value="banana">Today</SelectItem>
              <SelectItem value="blueberry">Montly</SelectItem>
              <SelectItem value="grapes">Yearly</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <h2 className="text-2xl font-medium text-gray-300 z-10">
        Welcome to Brand new Blogging App
      </h2>
      <div className="flex justify-center items-center h-full my-10 flex-wrap gap-4">
        <MiddleCard
          title="Title of a blog 2"
          subtitle="The absence of a deep emotional connection between humans and the natural world is at the root of the environmental crisis. Can you think of a place in nature that you know really well? "
          image="https://natureinmind.ie/wp-content/uploads/2019/05/IMG_0242-600x400.jpg"
          category="Nature"
          date="24-12-2024"
        />
        <MiddleCard
          title="Men of the Year"
          subtitle="In 2023, the sights and sounds offered by Indian men have been dizzying. The year belonged to Shah Rukh Khan, whose fans and films offered dazzling displays of joy, love, subtext, and box-office commerce."
          image="https://static.toiimg.com/imagenext/toiblogs/photo/blogs/wp-content/uploads/2023/12/pathaansrk.jpg"
          category="Entertainment"
          date="12-2-2024"
        />
        <MiddleCard
          title="Afghanistan’s magical rise continues"
          subtitle="In short two decades Afghanistan have gone from nothing to within touching distance of the top, all the while carrying a shadow to their story"
          image="https://i.guim.co.uk/img/media/c543be311ee9c08263cb9daaf73e198956fe493a/0_231_5395_3237/master/5395.jpg?width=620&dpr=1&s=none"
          category="Sports"
          date="24-06-2024"
        />
        <MiddleCard
          title="Title of a blog 2"
          subtitle="The absence of a deep emotional connection between humans and the natural world is at the root of the environmental crisis. Can you think of a place in nature that you know really well? "
          image="https://natureinmind.ie/wp-content/uploads/2019/05/IMG_0242-600x400.jpg"
          category="Nature"
          date="24-12-2024"
        />
        <MiddleCard
          title="Men of the Year"
          subtitle="In 2023, the sights and sounds offered by Indian men have been dizzying. The year belonged to Shah Rukh Khan, whose fans and films offered dazzling displays of joy, love, subtext, and box-office commerce."
          image="https://static.toiimg.com/imagenext/toiblogs/photo/blogs/wp-content/uploads/2023/12/pathaansrk.jpg"
          category="Entertainment"
          date="12-2-2024"
        />
        <MiddleCard
          title="Afghanistan’s magical rise continues"
          subtitle="In short two decades Afghanistan have gone from nothing to within touching distance of the top, all the while carrying a shadow to their story"
          image="https://i.guim.co.uk/img/media/c543be311ee9c08263cb9daaf73e198956fe493a/0_231_5395_3237/master/5395.jpg?width=620&dpr=1&s=none"
          category="Sports"
          date="24-06-2024"
        />
      </div>
    </div>
  );
};

export default Home;
