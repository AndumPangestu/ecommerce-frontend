import { Ruler } from "lucide-react";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

const SizeGuide = () => {
  const topsSizes = [
    { size: "XS", bust: "80-84", waist: "60-64", hips: "86-90" },
    { size: "S", bust: "84-88", waist: "64-68", hips: "90-94" },
    { size: "M", bust: "88-92", waist: "68-72", hips: "94-98" },
    { size: "L", bust: "92-96", waist: "72-76", hips: "98-102" },
    { size: "XL", bust: "96-100", waist: "76-80", hips: "102-106" },
  ];

  const bottomsSizes = [
    { size: "XS", waist: "60-64", hips: "86-90", inseam: "76" },
    { size: "S", waist: "64-68", hips: "90-94", inseam: "76" },
    { size: "M", waist: "68-72", hips: "94-98", inseam: "76" },
    { size: "L", waist: "72-76", hips: "98-102", inseam: "76" },
    { size: "XL", waist: "76-80", hips: "102-106", inseam: "76" },
  ];

  const dressesSizes = [
    { size: "XS", bust: "80-84", waist: "60-64", hips: "86-90", length: "100" },
    { size: "S", bust: "84-88", waist: "64-68", hips: "90-94", length: "102" },
    { size: "M", bust: "88-92", waist: "68-72", hips: "94-98", length: "104" },
    { size: "L", bust: "92-96", waist: "72-76", hips: "98-102", length: "106" },
    { size: "XL", bust: "96-100", waist: "76-80", hips: "102-106", length: "108" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-main py-12 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-4">
          Size Guide
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Find your perfect fit with our detailed size charts. All measurements are in centimeters.
        </p>

        {/* How to Measure */}
        <section className="bg-card border border-border rounded-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="h-6 w-6 text-secondary" />
            <h2 className="font-serif text-xl text-foreground">How to Measure</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-foreground mb-2">Bust</h3>
              <p className="text-sm text-muted-foreground">
                Measure around the fullest part of your bust, keeping the tape horizontal.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Waist</h3>
              <p className="text-sm text-muted-foreground">
                Measure around your natural waistline, the narrowest part of your torso.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Hips</h3>
              <p className="text-sm text-muted-foreground">
                Measure around the fullest part of your hips, about 20cm below your waist.
              </p>
            </div>
          </div>
        </section>

        {/* Size Charts */}
        <Tabs defaultValue="tops" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="tops">Tops</TabsTrigger>
            <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
            <TabsTrigger value="dresses">Dresses</TabsTrigger>
          </TabsList>

          <TabsContent value="tops">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Size</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Bust (cm)</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Waist (cm)</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Hips (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {topsSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-muted/50">
                      <td className="border border-border px-4 py-3 font-medium text-foreground">{row.size}</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">{row.bust}</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">{row.waist}</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="bottoms">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Size</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Waist (cm)</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Hips (cm)</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Inseam (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {bottomsSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-muted/50">
                      <td className="border border-border px-4 py-3 font-medium text-foreground">{row.size}</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">{row.waist}</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">{row.hips}</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">{row.inseam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="dresses">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Size</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Bust (cm)</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Waist (cm)</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Hips (cm)</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {dressesSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-muted/50">
                      <td className="border border-border px-4 py-3 font-medium text-foreground">{row.size}</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">{row.bust}</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">{row.waist}</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">{row.hips}</td>
                      <td className="border border-border px-4 py-3 text-muted-foreground">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        {/* Fit Tips */}
        <section className="mt-12 bg-muted/50 rounded-lg p-8">
          <h2 className="font-serif text-xl text-foreground mb-4">Fit Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• If you're between sizes, we recommend sizing up for a more relaxed fit.</li>
            <li>• Our tops tend to run true to size with a relaxed, flattering silhouette.</li>
            <li>• For bottoms, consider your preferred rise and whether you like a fitted or relaxed leg.</li>
            <li>• Still unsure? Contact our team for personalized sizing advice.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SizeGuide;