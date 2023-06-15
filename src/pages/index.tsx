import Head from "next/head";
import { useRouter } from "next/router";
import { format } from "date-fns";

interface TimeDifference {
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Calculates the time difference between the server time and client time.
 * @param {Date} serverTime - The server time.
 * @param {Date} clientTime - The client time.
 * @returns {TimeDifference} The time difference object containing { hours, minutes, seconds }.
 */
const calculateTimeDifference = (serverTime: Date, clientTime: Date): TimeDifference => {
  const timeDiff = Math.abs(serverTime.getTime() - clientTime.getTime());
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
};

interface HomeProps {
  server: string;
}

const Home = ({ server }: HomeProps): JSX.Element => {
  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  };

  const client = new Date();
  const serverTime = new Date(server);

  const timeDiff = calculateTimeDifference(serverTime, client);

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          {/* Display the server date and time */}
          <p>
            Server datetime: <span className="serverTime">{format(serverTime, "dd/MM/yyyy, HH:mm:ss")}</span>
          </p>

          {/* Display the time difference between the server and the client */}
          <p>
            Time diff:{" "}
            <span className="serverTime">
              {timeDiff.hours} hours, {timeDiff.minutes} minutes, {timeDiff.seconds} seconds
            </span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const server = new Date().toString();

  return {
    props: {
      server: server,
    },
  };
}
