import { Card, Typography } from '@material-tailwind/react';
import hamilton from '../assets/images/hamilton.avif';
import sainz from '../assets/images/sainz.avif';
import oscar from '../assets/images/piastri.avif';
import img5 from '../assets/images/img5.jpg';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-transparent text-gray-900">
      <header className="py-6">
        <div className="container mx-auto text-center">
          <Typography variant="h1" className="text-light-blue-900 text-4xl font-bold">
            About Us
          </Typography>
          <Typography variant="h6" className="text-light-blue-700 mt-2">
            Discover more about our blog and photography platform
          </Typography>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <section className="mb-12 border border-light-blue-200 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-6 lg:mb-0">
              <Typography variant="h2" className="text-3xl font-semibold mb-4 text-light-blue-900">
                Our Mission
              </Typography>
              <Typography variant="body1" className="text-lg text-gray-800">
                At InspirGraphy, our mission is to provide a platform where
                creative minds can share their stories, photographs, and ideas
                with the world. Whether you're a blogger or a photographer, we
                believe in giving you the tools to express yourself and connect
                with an audience that shares your passions.
              </Typography>
            </div>
            <div className="lg:w-1/2">
              <img
                src={img5}
                alt="About Us"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg mb-12 border-spacing-2 border-light-blue-200">
          <Typography variant="h2" className="text-2xl font-semibold mb-4 text-light-blue-900">
            Our Story
          </Typography>
          <Typography variant="body1" className="text-lg mb-4 text-light-blue-600">
            It all started with a simple idea: to create a space where people
            could showcase their talents and connect with others. Over the years,
            we have grown into a vibrant community of bloggers and photographers
            who are passionate about sharing their work. Our platform is built
            on the belief that everyone has a unique voice, and we are here to
            help you amplify it.
          </Typography>
        </section>

        <section>
          <Typography variant="h2" className="text-2xl font-semibold mb-6">
            Meet the Team
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-transparent shadow-lg border border-light-blue-300 transition-transform transform hover:scale-105 duration-300 ease-in-out">
              <img
                src={hamilton}
                alt="Team Member"
                className="w-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <Typography variant="h5" className="text-white font-semibold mb-2">
                  Lewis Hamilton
                </Typography>
                <Typography variant="body1">
                  Lewis Hamilton is the founder of InspirGraphy and has a passion for
                  writing and photography. He loves exploring new places and
                  sharing his experiences with the community.
                </Typography>
              </div>
            </Card>
            <Card className="bg-transparent shadow-lg border border-light-blue-300 transition-transform transform hover:scale-105 duration-300 ease-in-out">
              <img
                src={sainz}
                alt="Team Member"
                className="w-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <Typography variant="h5" className="text-white font-semibold mb-2">
                  Carlos Sainz
                </Typography>
                <Typography variant="body1">
                  Carlos Sainz is our content strategist and editor. He is dedicated to
                  helping our writers and photographers create engaging and
                  impactful content.
                </Typography>
              </div>
            </Card>
            <Card className="bg-transparent shadow-lg border border-light-blue-300 transition-transform transform hover:scale-105 duration-300 ease-in-out">
              <img
                src={oscar}
                alt="Team Member"
                className="w-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <Typography variant="h5" className="text-white font-semibold mb-2">
                  Oscar Piastri
                </Typography>
                <Typography variant="body1">
                  Oscar Piastri is our content strategist and editor. She is dedicated to
                  helping our writers and photographers create engaging and
                  impactful content.
                </Typography>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-transparent py-4 text-center text-light-blue-600">
        <Typography variant="body2">
          &copy; 2024 InspirGraphy. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
}
