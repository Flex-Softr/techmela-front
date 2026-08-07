const Conditions = () => {
  return (
    <div className="mb-8 w-full">
      <div className="bg-primary/10/50 border border-primary/20 rounded-xl p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-semibold text-primary mb-4 flex items-center gap-2">
          <span className="bg-primary/10 p-1.5 rounded-full">📝</span>
          Terms & conditions
        </h3>
        <p className="mb-4 text-sm md:text-base font-medium text-foreground">
          Warranty claims are subject to the following conditions:
        </p>
        <ul className="space-y-2 text-sm md:text-base text-muted-foreground list-disc list-inside ml-2">
          <li>
            Purchase date and the buyer&apos;s name, mobile number, and address
            must be provided correctly.
          </li>
          <li>A valid product ID must be provided.</li>
          <li>A description of the issue is required.</li>
          <li>Removing or altering any product rights is not allowed.</li>
          <li>A specific timeline will be provided for warranty service.</li>
          <li>
            All accessories, documentation, and packaging must be kept complete
            and carefully preserved.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Conditions;
