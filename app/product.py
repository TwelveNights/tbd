class ProductDetail:
    def __init__(self, name):
        self.name = name
        self.specs = []

    def add_spec(self, spec):
        self.specs.append(spec)

    def to_dict(self):
        d = {}
        d["name"] = self.name
        d["specifications"] = [spec.to_dict() for spec in self.specs]

        return d

class Specification:
    def __init__(self, name, value):
        self.name = name
        self.value = value

    def to_dict(self):
        return {"displayName": self.name, "value": self.value}