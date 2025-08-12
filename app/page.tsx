import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Tim's Website
      </h1>
      <p className="mb-4">
        {`Fusce bibendum ut metus sed porta. Integer venenatis suscipit lorem, eget feugiat 
        libero ullamcorper id. Nam diam diam, feugiat in mauris vitae, pretium mattis justo. 
        Phasellus eros nunc, malesuada a imperdiet semper, rhoncus ut ipsum. Aliquam 
        accumsan, eros eget blandit auctor, lacus enim lacinia lorem, non rhoncus nibh arcu 
        ac diam. Cras quis tincidunt nulla, sit amet convallis massa. Vivamus a odio non metus 
        gravida egestas. Proin euismod ullamcorper efficitur.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
