'use client';

const areas = [
  {
    materialName: 'diffuse_White.001',
    label: 'Arbeit in der Glashütte',
    color: '#95acbf',
  },
  {
    materialName: 'diffuse_White.003',
    label: 'Studiensammlung',
    color: '#929a96',
  },
  {
    materialName: 'diffuse_White.004',
    label: 'Modernes Glas',
    color: '#bf9780',
  },
  {
    materialName: 'diffuse_White.005',
    label: 'Großer Saal - Sonderausstellung',
    color: '#402121',
  },
  {
    materialName: 'diffuse_White.007',
    label: 'Reise durch die Geschichte des Glases',
    color: '#ff6e32',
  },
];

export const KlickpunkteModel = () => {
  return (
    <div className="w-full h-[300px] flex flex-col flex-grow overflow-hidden relative">
      <h2 className="px-[10vw] text-[6vw] leading-[7vw] text-[#374040] uppercase">
        Museums-Übersicht
      </h2>
      <model-viewer
        style={{ height: '100%' }}
        className="h-full w-full"
        auto-rotate={true}
        enable-pan=""
        src="/model/glasmuseum.glb"
        ar-modes="webxr scene-viewer quick-look"
        camera-controls={true}
        environment-image="/model/lightroom_14b.hdr"
        shadow-intensity="1"
        ar-status="not-presenting"
      ></model-viewer>
      <div>
        <div className="px-[10vw] py-[4vh] w-full h-full bg-white bg-opacity-80 text-slate-900 flex flex-col space-y-[3vw]">
          <h2 className="text-[3.2vw]">Legende</h2>
          <ul className="text-[2.4vw] grid grid-cols-2">
            {areas.map((area, index) => (
              <li key={index} className="flex items-center gap-[1vw]">
                <div
                  className="w-[2vw] h-[2vw] bg-white rounded-full"
                  style={{ backgroundColor: area.color }}
                />
                {area.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
