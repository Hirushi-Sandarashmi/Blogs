import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

interface BlogCardProps {
  id: number;
  title: string;
  content: string;
  image: string;
  author: number;
  pdate: string;
}

const BlogCard = (props: BlogCardProps) => {
  console.log(props);
  return (
    <div>
      <div className="card">
        <Card className="py-4 h-full flex flex-col justify-between">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">{props.author}</p>
            <small className="text-default-500">{props.pdate}</small>
            <h4 className="font-bold text-large">{props.title}</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <div className="card-image">
              <img
                alt="Card background"
                src={
                  props.image ||
                  "https://nextui.org/images/hero-card-complete.jpeg"
                }
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default BlogCard;
