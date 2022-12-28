type Property = {
  key: string;
  value: string | number | undefined | (string | undefined)[];
};

type CountryInfoProps = {
  properties: Property[];
};

export function CountryInfo({ properties }: CountryInfoProps) {
  return (
    <div className='flex flex-col gap-2'>
      {properties.map(property => (
        <p key={property.key}>
          <span className='text-very-dark font-semibold text-blue-very-dark dark:text-white'>
            {property.key}:{' '}
          </span>
          <span className='text-blue-very-dark dark:text-gray-very-light'>
            {property.value}
          </span>
        </p>
      ))}
    </div>
  );
}
