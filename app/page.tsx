import { Notes } from 'app/components/notes'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-wide">
        Tim's Website
      </h1>
      <p className="font-thin">IBM Plex Mono - Thin text. Does this look good?</p>
      <p className="font-bold">IBM Plex Mono - Bold text. yes / no</p>
      <p className="italic">IBM Plex Mono -  Italic text. pretty good?</p>
      <p className="font-semibold italic">IBM Plex Mono - Bold italic text. hows this one?</p>
      <p className="font-extrabold">IBM Plex Mono -  Extra bold text. foobar</p>
      <br className='my-4'/>
      <p className="mb-4">
        {`Fusce bibendum ut metus sed porta. Integer venenatis suscipit lorem, eget feugiat 
        libero ullamcorper id. Nam diam diam, feugiat in mauris vitae, pretium mattis justo. 
        Phasellus eros nunc, malesuada a imperdiet semper, rhoncus ut ipsum. Aliquam 
        accumsan, eros eget blandit auctor, lacus enim lacinia lorem, non rhoncus nibh arcu 
        ac diam. Cras quis tincidunt nulla, sit amet convallis massa. Vivamus a odio non metus 
        gravida egestas. Proin euismod ullamcorper efficitur.`}
      </p>
      <div className="my-8">
        <Notes />
      </div>
    </section>
  )
}
